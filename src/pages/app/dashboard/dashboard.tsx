import { Helmet } from 'react-helmet-async'

import DayOrdersAmountCard from './day-orders-amount-card'
import MonthCanceledAmountCard from './month-canceled-order-amount-card'
import MonthOrdersMountCard from './month-orders-amount-card'
import MonthRevenueCard from './month-revenue-card'

const Dashboard = () => {
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col gap-4">
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>

        <div className="grid grid-cols-4 gap-4">
          <MonthRevenueCard />
          <MonthOrdersMountCard />
          <DayOrdersAmountCard />
          <MonthCanceledAmountCard />
        </div>
      </div>
    </>
  )
}

export default Dashboard