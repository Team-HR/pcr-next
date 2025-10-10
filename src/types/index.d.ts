// src/types/index.d.ts
export { };

declare global {
  type Personnel = {
    employee_id: number;
    full_name: string;
    actual_accomplishment?: string;
  };

  type SuccessIndicator = {
    mi_id?: number | null;        // optional, can be number | null | undefined
    cf_ID?: number | null,
    mi_succIn: string;            // required
    perf_measures?: string[];     // optional
    personnel?: Personnel[];      // optional

    has_quality?: boolean;        // optional flags
    quality?: string[];

    has_efficiency?: boolean;
    efficiency?: string[];

    has_timeliness?: boolean;
    timeliness?: string[];
  };

  type Row = {
    cf_ID: number,
    mfo_periodId?: number,
    parent_id?: number,
    cf_count: string,
    cf_title: string,
    has_si: boolean,
    indent: number,
    num_si: number,
    success_indicators: SuccessIndicator[]
  }

  type Mfo = {
    cf_ID: number,
    cf_count: string,
    cf_title: string,
    corrections: string,
    dep_id: number,
    indent: number,
    isDisabled: boolean,
    mfo_periodId: number,
    parent_id: number
  }

  type EmployeeOption = {
    employee_id: number;
    full_name: string;
  };


  type Employee = {
    id: number;
    full_name: string;
    department: string;
  };

}