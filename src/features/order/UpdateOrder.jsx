import Button from "../../ui/Button.jsx";
import { useFetcher } from "react-router-dom";
import { updateOrder } from "../../services/apiRestaurant.js";

export async function action({ params }) {
  await updateOrder(params.orderId, { priority: true });
  return null;
}

export default function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  );
}
