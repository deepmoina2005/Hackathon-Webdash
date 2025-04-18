import AllSalesProduct from '../../components/Sales/AllSalesProduct'
import NewSalescustomer from '../../components/Sales/NewSalescustomer'

const NewSales = () => {
  return (
    <div className="flex w-full h-full gap-8">
      <div className="flex-[3]">
        <AllSalesProduct />
      </div>
      <div className="flex-[1]">
        <NewSalescustomer />
      </div>
    </div>
  )
}

export default NewSales;
