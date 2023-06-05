// import React from 'react'

// export default function Table() {
//     return (
//         <div className={`col-8`}>
//             <div className={`${style.selects}`}>
//                 <div className={`${style.selectLeft}`}>
//                     <span onClick={() => select("All")} className={`${style.click} ${selected === "All" ? style.active : ""}`}>All</span>
//                     <span onClick={() => select("Incomings")} className={`${style.click} ${selected === "Incomings" ? style.active : ""}`}>Incomings</span>
//                     <span onClick={() => select("Outcomings")} className={`${style.click} ${selected === "Outcomings" ? style.active : ""}`}>Outcomings</span>
//                 </div>
//                 <select
//                     value={selectedMonth}
//                     onChange={(e) => { setSelectedMonth(Number(e.target.value)) }}
//                     name=""
//                     id=""
//                 >
//                     <option value="1">yanvar</option>
//                     <option value="2">fevral</option>
//                     <option value="3">mart</option>
//                     <option value="4">aprel</option>
//                     <option value="5">may</option>
//                     <option value="6">iyun</option>
//                     <option value="7">iyul</option>
//                     <option value="8">avqust</option>
//                     <option value="9">sentyabr</option>
//                     <option value="10">oktyabr</option>
//                     <option value="11">noyabr</option>
//                     <option value="12">dekabr</option>
//                 </select>
//             </div>
//             <DataTable
//                 value={selectData}
//                 sortmode="multiple"
//                 first={first} rows={rows}
//                 paginator={selectData.length > 5}
//                 paginatorTemplate=" PrevPageLink PageLinks NextPageLink "
//                 onPage={(e) => onPageChange(e)}
//             >
//                 {/*//! locale en az dinamik yazmaq  */}
//                 <Column field="date" body={(rowData) => moment((rowData.date)).locale('az').format('MMMM DD, yyyy HH:mm:ss')} header="Date" sortable></Column>
//                 <Column field="amount" header="Amount" sortable></Column>
//                 <Column field="type" header="Type" body={(ty) => ty.type === "Incoming" ? "Income" : "Outcome"} sortable></Column>
//                 <Column field="date" header="Transaction Details" sortable body={(rowData) => (
//                     <>
//                         <div>{rowData.type}</div>
//                         <div>{moment((rowData.date)).format('MMMM DD, yyyy HH:mm:ss')}</div>
//                     </>
//                 )}></Column>
//             </DataTable>
//         </div>
//     )
// }
