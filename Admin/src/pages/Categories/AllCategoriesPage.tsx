import AllCategories from '../../components/Categories/AllCategories'

const AllCategoriesPage = () => {
  return (
    <div>
      <AllCategories categories={[]} onToggleStatus={function (id: number): void {
        throw new Error('Function not implemented.')
      } } onDelete={function (id: number): void {
        throw new Error('Function not implemented.')
      } }/>
    </div>
  )
}

export default AllCategoriesPage