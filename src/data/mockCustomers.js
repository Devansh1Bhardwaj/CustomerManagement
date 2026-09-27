// Starting dataset. Loaded into localStorage once, on first run,
// then all edits happen against localStorage (see CustomerContext.jsx).
const mockCustomers = [
  { id: 1, name: 'Ananya Sharma', email: 'ananya.sharma@brightretail.com', phone: '98765 43210', company: 'Bright Retail', status: 'Active', joinedDate: '2024-02-11' },
  { id: 2, name: 'Rohit Malhotra', email: 'rohit.m@nexawear.in', phone: '91234 56780', company: 'NexaWear', status: 'Active', joinedDate: '2024-05-03' },
  { id: 3, name: 'Priya Iyer', email: 'priya.iyer@fintrust.co', phone: '99887 66554', company: 'FinTrust Co.', status: 'Lead', joinedDate: '2025-01-19' },
  { id: 4, name: 'Karan Verma', email: 'karan.verma@orbitlogistics.com', phone: '90011 22334', company: 'Orbit Logistics', status: 'Inactive', joinedDate: '2023-11-27' },
  { id: 5, name: 'Simran Kaur', email: 'simran.kaur@greenleaf.org', phone: '98123 45670', company: 'GreenLeaf Foundation', status: 'Active', joinedDate: '2024-08-14' },
  { id: 6, name: 'Arjun Nair', email: 'arjun.nair@quantumedge.io', phone: '93456 78901', company: 'QuantumEdge', status: 'Lead', joinedDate: '2025-03-02' },
]

export default mockCustomers
