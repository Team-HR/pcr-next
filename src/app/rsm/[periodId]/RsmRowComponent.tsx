'use client';

import { useState } from "react";
import API from "@/lib/axios";

// type PeriodSelectorProps = {
//   title?: string;
//   description?: string;
//   icon?: string;
//   onSelect?: (periodId: number) => void;
// }



type Personnel = {
  employee_id: number,
  full_name: string,
  actual_accomplishment?: string
}

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
  index: number
}

type SuccessIndicator = {
  mi_succIn: string,
  perf_measures: Array<string>,
  personnel?: Personnel[],
  has_quality: boolean
  quality: Array<string>
  has_efficiency: boolean
  efficiency: Array<string>
  has_timeliness: boolean
  timeliness: Array<string>
}


export default function RsmRowComponent({ row, index }: RsmRowProps) {

  return (
    <>
      <td
        className="px-4 border"
        style={{ textIndent: row.indent ? row.indent * 10 : 0 }}
      >
        {row.cf_count} {row.cf_title}
      </td>
      <td className="px-4 border">
        {row.success_indicators[index].mi_succIn}
      </td>
      <td className="px-4 border">
        {
          row.success_indicators[index].perf_measures ? row.success_indicators[index].perf_measures.map((measure: any, mIndex: number) => {
            return <div key={mIndex} className="p-0 m-0">{measure}</div>
          }) : ''
        }
      </td>
      <td className="px-4 border">
        {
          row.success_indicators[index].has_quality ? row.success_indicators[index].quality.map((item: string, i: number) => {
            if (i < 5 && item) {
              return <div key={i}><b>{5 - i}</b> - {item}</div>
            }
          }) : ''
        }
      </td>
      <td className="px-4 border">
        {
          row.success_indicators[index].has_efficiency ? row.success_indicators[index].efficiency.map((item: string, i: number) => {
            if (i < 5 && item) {
              return <div key={i}><b>{5 - i}</b> - {item}</div>
            }
          }) : ''
        }
      </td>
      <td className="px-4 border">
        {
          row.success_indicators[index].has_timeliness ? row.success_indicators[index].timeliness.map((item: string, i: number) => {
            if (i < 5 && item) {
              return <div key={i}><b>{5 - i}</b> - {item}</div>
            }
          }) : ''
        }
      </td>
      <td className="px-4 border">
        {
          row.success_indicators[index].personnel ? row.success_indicators[index].personnel.map((person: Personnel) => {
            return <div key={person.employee_id}>{person.full_name}</div>
          }) : ''
        }
      </td>
      <td className="px-4 border"></td>
    </>
  );
}
