import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import AddProducts from "./pages/Inventory/AddProduct";
import AllProducts from "./pages/Inventory/AllProducts";
import NewSales from "./pages/Sales/NewSales";
import SalesHistory from "./pages/Sales/SalesHistory";
import AllSupliers from "./pages/Supliers/AllSupliers";
import AddSupliers from "./pages/Supliers/AddSupliers";
import AddCategory from "./pages/Categories/AddCategory";
import AllCategories from "./pages/Categories/AllCategories";
import Reports from "./pages/Reports";
import PurchaseHistory from "./pages/Purchase/PurchaseHistory";
import AddPurchase from "./pages/Purchase/AddPurchase";
import Settings from "./pages/Settings";
import AddUnits from "./pages/Units/AddUnits";
import AllUnits from "./pages/Units/AllUnits";
import Invoice from "./pages/Invoice";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route element={<AppLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/profile" element={<UserProfiles />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/settings" element={<Settings/>} />
            <Route path="/form-elements" element={<FormElements />} />
            <Route path="/basic-tables" element={<BasicTables />} />
            <Route path="/alerts" element={<Alerts />} />
            <Route path="/avatars" element={<Avatars />} />
            <Route path="/badge" element={<Badges />} />
            <Route path="/buttons" element={<Buttons />} />
            <Route path="/images" element={<Images />} />
            <Route path="/videos" element={<Videos />} />
            <Route path="/line-chart" element={<LineChart />} />
            <Route path="/bar-chart" element={<BarChart />} />
            <Route path="/add-product" element={<AddProducts/>} />
            <Route path="/all-products" element={<AllProducts/>} />
            <Route path="/new-sales" element={<NewSales />} />
            <Route path="/sales-history" element={<SalesHistory />} />
            <Route path="/add-purchase" element={<AddPurchase/>} />
            <Route path="/all-purchase" element={<PurchaseHistory/>} />
            <Route path="/all-supliers" element={<AllSupliers/>} />
            <Route path="/add-supliers" element={<AddSupliers/>} />
            <Route path="/all-categories" element={<AllCategories/>} />
            <Route path="/add-category" element={<AddCategory/>} />
            <Route path="/add-unit" element={<AddUnits/>} />
            <Route path="/all-units" element={<AllUnits/>} />
            <Route path="/reports" element={<Reports/>} />
            <Route path="/invoice" element={<Invoice/>}/>
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          
          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
