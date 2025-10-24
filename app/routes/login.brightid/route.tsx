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
import { toast } from "sonner"
import { useUser } from "~/store"
import { useQuery } from "@tanstack/react-query"
import { toHex } from "viem"
import { Buffer } from "buffer"

const appId = "AuraDashboard"

export default function LoginWithBrightId() {
  const [universalLink, setUniversalLink] = useState("")
  const [qrCodeSize, setQrCodeSize] = useState(400)
  const [wallet, setWallet] = useState({
    publicKey: "",
    privateKey: "",
  })
  const user = useUser()

  const {} = useQuery({
    queryKey: [
      "sponsorship",
      user.appUserId ?? "app-userid",
      user.privateKey ?? "private-key",
      appId,
    ],
    enabled: !!(user.appUserId && user.privateKey),
    // refetchInterval: 3000,
    queryFn: async () => {
      const userId = user.appUserId
      try {
        if (!user.privateKey || !userId) return

        console.log([user.privateKey, appId, userId])

        const res = await sponsor(user.privateKey, appId, userId)
        console.log("Sponsor response:", res)

        try {
          const status = await userSponsorshipStatus(userId)
          console.log("Sponsorship status:", status)
        } catch (statusError) {
          console.error("Sponsorship status error:", statusError)
        }
      } catch (error) {
        console.error("Sponsor error:", error)
        toast.error("Failed to sponsor user", {
          description: `${error}`,
        })
      }

      return {}
    },
  })

  const copyQr = () => {
    if (!universalLink) return
    copyToClipboard(universalLink)
    toast("Open this link with the BrightID app.", {
      description: universalLink,
    })
  }

  const generateBrightIDLink = useCallback(() => {
    const randomKey = toHex(crypto.getRandomValues(new Uint8Array(64)))

    const privateKey = Buffer.from(randomKey.slice(2), "hex").toString("hex")

    setWallet({
      publicKey: randomKey,
      privateKey: privateKey,
    })

    user.updateUserId(randomKey)

    user.generatePrivateKey(privateKey)

    const deepLink = generateDeeplink(appId, randomKey)
    setUniversalLink(deepLink)
  }, [])

  useEffect(() => {
    if (universalLink.length) return
    setQrCodeSize(Math.min(window.innerWidth * 0.9 - 40, 270))
    generateBrightIDLink()
  }, [generateBrightIDLink, universalLink])

  return (
    <div className="max-w-2xl pt-20 mx-auto">
      <section className="text-center mb-6 pl-5 pr-12">
        <FadeIn delay={0.1}>
          <p data-testid="recovery-title" className="mb-6 text-5xl font-black">
            Login
          </p>
        </FadeIn>
        <FadeIn delay={0.15}>
          <p className="text-lg font-medium">
            <span className="hidden md:block">
              Scan to log in with brightid
            </span>
            <span className="block md:hidden">Tap to log in with brightid</span>
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
              className="text-left w-sm whitespace-nowrap line-clamp-1 text-sm text-ellipsis font-medium text-white underline"
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
