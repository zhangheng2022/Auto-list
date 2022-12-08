
import vpnSignin from "./scripts/v2free-vpn-signin.js";


function main() {
    const script = process.env.npm_lifecycle_event
    if (script === "vpn-signin") {
        vpnSignin()
    }
}


main()