export const DateUtils = {
    getCurrentDate: (): string => {
        const today = new Date();
		const year = today.getFullYear();
		const month = String(today.getMonth() + 1).padStart(2, '0');
		const day = String(today.getDate()).padStart(2, '0');
		return `${year}-${month}-${day}`;
    },

    getYesterdayDate: (): string => {
        const today = new Date();
        today.setDate(today.getDate() - 1);
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    getDay: (present?: boolean): string => {
        const today = new Date();
        today.setDate(today.getDate() + 5);
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = present ? '31' : String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },

    getCurrentDateAndHour: (): string => {
        const currentDateTime = new Date();

        const year = currentDateTime.getFullYear();
        const month = String(currentDateTime.getMonth() + 1).padStart(2, '0'); // Mes comienza en 0
        const day = String(currentDateTime.getDate()).padStart(2, '0');

        const hours = String(currentDateTime.getHours()).padStart(2, '0');
        const minutes = String(currentDateTime.getMinutes()).padStart(2, '0');
        const seconds = String(currentDateTime.getSeconds()).padStart(2, '0');

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },

    getHoursBetweenDates: (initialDate: string, finishDate: string): number => {
        const startDate = new Date(initialDate);
        const endDate = new Date(finishDate);
        if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
            throw new Error("Las fechas proporcionadas no son válidas.");
        }
        const differenceInMilliseconds = endDate.getTime() - startDate.getTime();
        const differenceInHours = differenceInMilliseconds / (1000 * 60 * 60);
        const floatValue = parseFloat(differenceInHours.toFixed(3));
        return floatValue;
    },

    getHMSFormat: (date: string): string => {
        const dateObject = new Date(date);
        const formattedTime = dateObject.toLocaleTimeString("en-US", { hour12: false });
        return formattedTime;
    },

    changeNumberToHoursAndMinutes: (decimalHours?: number) => {
        let res = '0:00';
        if (decimalHours) {
            const hours = Math.floor(decimalHours);
            const minutes = Math.round((decimalHours - hours) * 60);
            res = `${hours}:${minutes.toString().padStart(2, '0')}`;
        }
        return res;
    },
    /**
     * 
     * @param date string
     * change 16:02:16 to 16:
     */

    chageHourStringToHoursAndMinutes: (hour?: string): string => {
        if (hour) {
            return hour.substring(0,5);
        } else {
            return '--';
        }
    },

    changeYearMonthDayFormatToDayMonthYear: (day?: string) => {
        let res = '--';
        if (day) {
            let [year, month, date] = day.split("-");
            res = `${date}/${month}/${year}`; 
        }
        return res;
    }
} 


