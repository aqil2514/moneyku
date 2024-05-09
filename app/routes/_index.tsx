import { redirect } from '@remix-run/node';

export async function loader(){
  return redirect("/login");
}

export default async function Index() {
  return <></>;
}
