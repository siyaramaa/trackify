import dynamic from "next/dynamic";

const UserGreet = dynamic(() => import('@/components/userGreet'), {
        ssr: false,
      loading: () => <p>Siya ramaa...</p>
});

const Graph = dynamic(() => import('@/components/graph'));
const Recent = dynamic(() => import('@/components/Recent'));

//Index page of /inventory or home page.
export default function Home() {

  return (
    <div className="flex-1 p-4">
      <h1 className="font-bold text-lg md:text-xl">Dashboard</h1>
      {/* Greeting the user */}
      <UserGreet />
      <div className="flex flex-col xl:flex-row justify-between space-x-2">
      {/* Graph and Recent components */}
      <Graph />  {/* It includes Graph of Expenses */}
      <Recent /> {/* It includes recently added incomes and expenses */}
      </div>
    </div>
  )
}
