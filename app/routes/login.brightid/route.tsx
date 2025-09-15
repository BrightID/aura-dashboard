import { CopyIcon } from "lucide-react"
import { QRCode } from "react-qrcode-logo"
import { Link } from "react-router"
import { FadeIn } from "~/components/animations"
import { copyToClipboard } from "~/utils/clipboard"
import {
  generateDeeplink,
  sponsor,
  userSponsorshipStatus,
} from "brightid_sdk_v6/dist/appMethods"
import { useCallback, useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { toast } from "sonner"
import { useUser } from "~/store"
import { useGenerateKeys } from "~/utils/web3"

const appId = "AuraDashboard"

export default function LoginWithBrightId() {
  const [universalLink, setUniversalLink] = useState("")

  const [qrCodeSize, setQrCodeSize] = useState(400)
  const { isLoading, keys, signPrivateKey } = useGenerateKeys()

  const user = useUser()

  const copyQr = () => {
    if (!universalLink) return

    let alertText = ""
    let clipboardMsg = ""

    alertText = "Open this link with the BrightID app."
    clipboardMsg = universalLink

    copyToClipboard(universalLink)

    toast(alertText, {
      description: clipboardMsg,
    })
  }

  const generateBrightIDLink = useCallback(() => {
    const contextId = uuidv4()
    user.updateUserId(contextId)
    user.generatePrivateKey()

    const deepLink = generateDeeplink(appId, contextId)

    setUniversalLink(deepLink)
  }, [])

  useEffect(() => {
    if (universalLink.length) return

    setQrCodeSize(Math.min(window.innerWidth * 0.9 - 40, 270))
    generateBrightIDLink()
  }, [generateBrightIDLink, universalLink])

  useEffect(() => {
    if (!user.appUserId || !user.privateKey || isLoading || !keys) return

    const userId = user.appUserId

    let interval: NodeJS.Timeout
    signPrivateKey().then((pk) => {
      console.log(pk)
      sponsor(pk, appId, user.appUserId!).then((res) => {
        console.log(res)
        interval = setInterval(() => {
          userSponsorshipStatus(userId).then((res) => console.log(res))
        }, 5000)
      })
    })

    return () => {
      clearInterval(interval)
    }
  }, [user.appUserId, isLoading, keys, user.privateKey])

  return (
    <div className="max-w-2xl pt-20 mx-auto">
      <section className=" text-center mb-6 pl-5 pr-12">
        <FadeIn delay={0.1}>
          <p data-testid="recovery-title" className="mb-6 text-5xl font-black">
            Login
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="text-lg font-medium">
            <span className="hidden md:block">Scan to log in</span>
            <span className="block md:hidden">Tap to log in</span>
          </p>
        </FadeIn>
      </section>

      <Link
        className="mb-3 flex flex-col items-center gap-6 pl-8 pr-10"
        to={universalLink}
        target="_blank"
        rel="noreferrer"
      >
        {universalLink && (
          <FadeIn delay={0.2}>
            <QRCode
              value={universalLink}
              size={qrCodeSize}
              quietZone={12}
              removeQrCodeBehindLogo={true}
              logoPadding={0}
              eyeRadius={6}
              logoImage={"/images/login/brightid-qrcode-logo.svg"}
              logoWidth={qrCodeSize * 0.25}
              logoHeight={qrCodeSize * 0.25}
              id="qr-code"
            />
          </FadeIn>
        )}

        <FadeIn delay={0.25} className="flex items-center gap-2">
          <hr className="h-[1px] w-12" />
          <p className="">Or</p>
          <hr className="h-[1px] w-12" />
        </FadeIn>
        <FadeIn delay={0.25}>
          <p className="text-lg font-medium">
            Open the Link below on your phone
          </p>
        </FadeIn>
      </Link>

      <FadeIn delay={0.3} className="actions mb-auto pb-16 text-center">
        <section className="actions mb-auto pb-16 text-center">
          <span className="flex w-full items-center justify-between gap-2 rounded-lg bg-gray00 py-2 pl-3 pr-2.5">
            <a
              href={universalLink}
              target="_blank"
              data-testid={universalLink && "import-universal-link"}
              className="line-clamp-1 text-ellipsis text-left font-medium text-white underline"
              rel="noreferrer"
            >
              {universalLink}
            </a>
            <CopyIcon onClick={copyQr} />
          </span>
        </section>
      </FadeIn>
      <FadeIn delay={0.35}>
        <footer className="flex justify-between text-sm text-gray90">
          <span className="flex gap-1">
            <p className="font-light">Version</p>
            <p data-testid="app-version" className="">
              {APP_VERSION}
            </p>
          </span>
          <span className="flex gap-1">
            <p className="text-gray50">Powered by:</p>
            <p className="font-light">BrightID</p>
          </span>
        </footer>
      </FadeIn>
    </div>
  )
}
