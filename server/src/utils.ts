export class Utils {

    static log(logMessage: string): void {
        const timestamp = new Date().toLocaleDateString();
        console.log(`SERVER LOG: ${timestamp} ### ${logMessage}`);
    }
}
