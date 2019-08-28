import { fire } from '../index';

export interface ITimeSheet {
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
    saturday: number;
    sunday: number;
    approved: boolean;
    approvedDate?: Date;
    approvedBy?: string;
    dateStarting: Date;
}
export interface IWeek {
    title: string;
    weekStart: Date;
}

const TIMESHEET_COLLECTION = 'Timesheets';

const WEEK_COLLECTION = 'Week';

class TimeSheetService {
    public saveTimeSheet = async (timeSheet: ITimeSheet) => {
        await fire
            .firestore()
            .collection(TIMESHEET_COLLECTION)
            .doc()
            .set(timeSheet);
    };

    public getUsersTimeSheets = () => {
        return new Promise<any[]>(async (resolve, reject) => {
            try {
            } catch (error) {
                reject(error);
            }
        });
    };

    public submitTimeSheet = () => {};
    public setApprover = () => {};
    public approveTimeSheet = () => {};
    public createNewTimeSheet = () => {};

    public getWeeks = async () => {
        return new Promise<any[]>(async (resolve, reject) => {
            let weekData: any[] = [];
            try {
                const snapshot = await fire
                    .firestore()
                    .collection(WEEK_COLLECTION)
                    .get();

                snapshot.forEach(doc => {
                    weekData.push(doc.data());
                });
                resolve(weekData);
            } catch (error) {
                reject(error);
            }
        });
    };
}

export default TimeSheetService;
