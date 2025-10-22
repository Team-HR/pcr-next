'use client';

import { TbEdit, TbTrash } from "react-icons/tb";
import MfoDropdownComponent from "./MfoDropdownComponent";

type RsmRowProps = {
  row: Row,
  index: number,
  onEditonSelect: (successIndicator: SuccessIndicator) => void,
  onDelete: (mi_id: number) => void
}


export default function RsmRowComponent({ row, index, onEditonSelect, onDelete }: RsmRowProps) {

  function editSuccessIndicator(successIndicator: SuccessIndicator) {
    onEditonSelect(successIndicator)
  }

  async function deleteSi(mi_id: number) {
    onDelete(mi_id)
  }

  return (
    <>
      {
        index < 1 ?
          <>
            <td
              rowSpan={row.num_si}
              className="border-1 border-gray-300"
            >
              <div className="flex"> <div style={{ width: row.indent ? row.indent * 20 : 0 }}></div> <MfoDropdownComponent row={row} /> <div className="ml-2">{row.cf_count} {row.cf_title}</div></div>
            </td></>
          : ''
      }
      <td className="px-4 border-1 border-gray-300">
        {row.success_indicators[index].mi_succIn}
      </td>
      <td className="px-4 border-1 border-gray-300 text-xs">
        {
          row.success_indicators[index].perf_measures ? row.success_indicators[index].perf_measures.map((measure, mIndex) => {
            return <div key={mIndex} className="p-0 m-0">{measure}</div>
          }) : ''
        }
      </td>
      <td className="px-4 border-1 border-gray-300 text-xs">
        {
          row.success_indicators[index].quality ? row.success_indicators[index].quality.map((item: string, i: number) => {
            if (i < 5 && item) {
              return <div key={i}><b>{5 - i}</b> - {item}</div>
            }
          }) : ''
        }
      </td>
      <td className="px-4 border-1 border-gray-300 text-xs">
        {
          row.success_indicators[index].efficiency ? row.success_indicators[index].efficiency.map((item: string, i: number) => {
            if (i < 5 && item) {
              return <div key={i}><b>{5 - i}</b> - {item}</div>
            }
          }) : ''
        }
      </td>
      <td className="px-4 border-1 border-gray-300 text-xs">
        {
          row.success_indicators[index].timeliness ? row.success_indicators[index].timeliness.map((item: string, i: number) => {
            if (i < 5 && item) {
              return <div key={i}><b>{5 - i}</b> - {item}</div>
            }
          }) : ''
        }
      </td>
      <td className="px-4 border-1 border-gray-300 text-xs">
        {
          row.success_indicators[index].personnel ? row.success_indicators[index].personnel.map((person: Personnel) => {
            return <div key={person.employee_id} className="mb-3">{person.full_name}</div>
          }) : ''
        }
      </td>
      <td className="px-4 border-1 border-gray-300">
        {/* <pre>
          {JSON.stringify(row.success_indicators[index], null, 3)}
        </pre> */}
        <button className="btn btn-ghost btn-circle mb-1 text-green-600" onClick={() => { editSuccessIndicator(row.success_indicators[index]) }}><TbEdit /></button>
        <button className="btn btn-ghost btn-circle mb-1 text-red-600" onClick={() => { deleteSi(row.success_indicators[index].mi_id) }}><TbTrash /></button>
        {/* rIndex: {rowIndex}  sIndex: {index} */}
      </td>
    </>
  );
}