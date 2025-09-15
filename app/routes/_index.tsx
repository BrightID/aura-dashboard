import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Link } from "react-router"

function LoginScreen() {
  return (
    <div className="">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Aura Dashboard</CardTitle>
          <CardDescription>
            Login with BrightID to access dashboard
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Getting Started</Label>
            <ol className="list-decimal ml-4">
              <li>Download BrightID</li>
              <li>Scan the link in the next step</li>
            </ol>
          </div>
          <Link to="/login/brightid">
            <Button className="w-full">Continue</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginScreen
