export interface ActionPlan {
  form:  {
    actionDescription: string,
    personInCharge: string,
    priority: string,
    actionTypes: string,
    targetDate: string,
  },
  incidentReportID: number,
}