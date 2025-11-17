
const coreFunction = {
    show: (mfoPeriodId: string | number, departmentId: string | number) =>
        `/api/ihris_v2/mfo-periods/${mfoPeriodId}/departments/${departmentId}`,

};

const stratFunction = {
    show: (mfoPeriodId: string | number, employeesId: string | number) =>
        `/api/pcr/${mfoPeriodId}/strategic/${employeesId}`,
}

export const routes = { coreFunction, stratFunction };
