'use client';

import { TbEdit, TbTrash } from "react-icons/tb";
import MfoDropdownComponent from "./MfoDropdownComponent";

// type PeriodSelectorProps = {
//   title?: string;
//   description?: string;
//   icon?: string;
//   onSelect?: (periodId: number) => void;
// }

type Row = {
  cf_ID: number,
  cf_count: string,
  cf_title: string,
  has_si: boolean,
  indent: number,
  num_si: number,
  success_indicators: SuccessIndicator[] | []
}

type RsmRowProps = {
  row: Row,
  index: number,
  onEditonSelect: (success_indicator: SuccessIndicator) => void;
  // setSiToEdit: Dispatch<SetStateAction<SuccessIndicator | null>>
  // setMiSuccIn: Dispatch<SetStateAction<string>>
}


export default function RsmRowComponent({ row, index, onEditonSelect }: RsmRowProps) {

  function editSuccessIndicator(si: SuccessIndicator) {
    onEditonSelect(si)
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
        <button className="btn btn-ghost btn-circle mb-1 text-red-600" onClick={() => { editSuccessIndicator(row.success_indicators[index]) }}><TbTrash /></button>
        {/* rIndex: {rowIndex}  sIndex: {index} */}
      </td>
    </>
  );
}