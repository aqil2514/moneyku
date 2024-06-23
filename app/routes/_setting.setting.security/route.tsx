import Typography from "components/General/Typography";
import { ActionFunctionArgs, MetaFunction } from "@remix-run/node";
import { useFetcher } from "@remix-run/react";
import Textfield from "components/Inputs/Textfield";
import Alert from "components/Feedback/Alert";
import { PiNoteDuotone } from "react-icons/pi";
import Button from "components/Inputs/Button";
import { FaUnlockAlt } from "react-icons/fa";
import { jsonWithInfo } from "remix-toast";
import { getUser } from "utils/account";

export const meta: MetaFunction = () => [{ title: "Keamanan | Moneyku" }];

export async function action({request}: ActionFunctionArgs){
    const user = await getUser(request);

    // TODO : Lanjutin nanti
    // TODO : Gimana kalo user loginnya pakek email? Kan awalnya ga ada password tuh
    // TODO : Gimana kalo clientnnya lupa password?

    return jsonWithInfo({data: user}, "Dalam pengembangan");
}

export default function Security() {
  const fetcher = useFetcher();

  return (
    <div id="setting-page-security">
      <Typography variant="h1" family="merriweather-bold">
        Keamanan
      </Typography>

      <fetcher.Form method="POST">
        <Alert type="info" className="flex items-center gap-1">
          {" "}
          <PiNoteDuotone /> Beritahu kami bahwa ini memang Anda
        </Alert>
        <Textfield
          fieldType="password"
          fontFamily="poppins-medium"
          forId="password"
          label="Password"
        />

        <Button startIcon={<FaUnlockAlt />} color="success">Buka Akses</Button>
      </fetcher.Form>
    </div>
  );
}
