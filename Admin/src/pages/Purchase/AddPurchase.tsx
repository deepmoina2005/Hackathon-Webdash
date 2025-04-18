import { ArrowLeft } from "lucide-react";
import Button from "../../components/ui/button/Button";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import AddPurchaseProduct from "../../components/Purchase/AddPurchase";

const AddPurchase = () => {
  const handleBackClick = () => {
    window.history.back(); // Go back to the previous page in browser history
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <Button
          onClick={handleBackClick} // Attach handleBackClick to the button's onClick
          className="flex items-center bg-blue-500 text-white h-10 w-24 rounded-md hover:bg-blue-600 mb-2"
        >
          <ArrowLeft width={20} height={20} />
          Back
        </Button>
        <PageBreadcrumb pageTitle="Purchase History" />
      </div>
      <div className="space-y-6 mt-4">
        <AddPurchaseProduct/>
      </div>
    </div>
  );
};

export default AddPurchase;