const data = [
    { id: 1, name: 'Alice', amount: '$120', status: 'Paid' },
    { id: 2, name: 'Bob', amount: '$90', status: 'Unpaid' },
  ]
  
  export default function InvoiceTable() {
    return (
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="p-3">Name</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map(({ id, name, amount, status }) => (
              <tr key={id} className="border-b">
                <td className="p-3">{name}</td>
                <td className="p-3">{amount}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-sm ${
                    status === 'Paid' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>{status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
  