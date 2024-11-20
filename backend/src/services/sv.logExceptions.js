class LogExceptions {
    async log(e, req, custom) {
        try {
            console.error("");
            console.error("");
            console.error("");
            console.error("");
            console.error(
                "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬",
            );
            console.error("A new error occurred on ", new Date());
            console.error(
                "▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬▬",
            );
            // IF ERROR PRESENT
            if (e) {
                console.error("");
                console.error("▬▬▬ Error Information ▬▬▬ ");
                if (typeof e == "string" || e instanceof String)
                    console.error("Error Message:", e);
                if (e.message) console.error("Message: ", e.message);
                if (e.code) console.error("Code: ", e.code);
                if (e.name) console.error("Name: ", e.name);
                if (e.fileName) console.error("FileName: ", e.fileName);
                if (e.procName) console.error("Proc Name: ", e.procName);
                if (e.lineNumber) console.error("Line Number: ", e.lineNumber);
                if (e.columnNumber)
                    console.error("Column Number: ", e.columnNumber);
                if (e.originalError)
                    console.error("Original Error: ", e.originalError);
                if (e.stack) {
                    console.error("Stack: ");
                    console.error(e.stack);
                }
            }
            // IF ERROR WITH REQUEST
            if (req) {
                console.error("");
                console.error("▬▬▬ Execution Information ▬▬▬ ");
                if (req.baseUrl) console.error("Base URL: ", e.baseUrl);
                if (req.path) console.error("Base Path: ", e.path);
                if (req.method) console.error("Method: ", e.method);
                if (req.body) console.error("Body: ", e.body);
                if (req.params) console.error("Params: ", e.params);
                if (req.query) console.error("Query: ", e.query);
                if (req.session) console.error("Session: ", e.session);
            }
            // IF ERROR WITH CUSTOM
            if (custom) {
                console.error("");
                console.error("▬▬▬ Additional Diagnosis Information ▬▬▬");
                if (typeof custom == "object")
                    for (let attribute in custom) {
                        if (typeof custom == "object") {
                            if (typeof custom[attribute] == "object")
                                custom[attribute].__proto__ = null;
                            console.error(
                                attribute + ":",
                                typeof custom[attribute] == "object"
                                    ? JSON.stringify(custom[attribute])
                                    : custom[attribute],
                            );
                        } else {
                            console.error("Custom Information: ", custom);
                        }
                    }
                return;
            }
        } catch (e) {
            console.error(
                "An unhandled error has occured while handling and logging an error.",
            );
            console.error(e);
        }
    }
}

module.exports = new LogExceptions();
