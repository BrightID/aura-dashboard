import { LogOutIcon, Moon, Sun } from "lucide-react"
import { Button } from "~/components/ui/button"
import { Separator } from "~/components/ui/separator"
import { SidebarTrigger } from "~/components/ui/sidebar"
import { useTheme } from "~/components/theme-provider"
import { logUserOut } from "~/lib/auth-actions"
import { useNavigate } from "react-router"

export function SiteHeader() {
  const { theme, setTheme } = useTheme()

  const navigate = useNavigate()

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">Dashboard</h1>
        <div className="ml-auto flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
          <Button variant="ghost" asChild size="sm" className="hidden sm:flex">
            <Button
              onClick={() => {
                logUserOut()
                navigate("/")
              }}
              variant={"outline"}
              className="dark:text-foreground"
            >
              <LogOutIcon />
              Logout
            </Button>
          </Button>
        </div>
      </div>
    </header>
  )
}
