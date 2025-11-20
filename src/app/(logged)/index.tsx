import { Redirect } from "expo-router";

export default function LoggedIndex() {
  return <Redirect href={"/(logged)/(home)/" as any} />;
}
