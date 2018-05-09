
var exec = require('child_process').exec;

dir = exec("rm -rf HaroldBotv2", (err, stdout, stderr) => {
    if (err) {
        console.log(err);
        return;
        // should have err.code here?
    }
    console.log('Removed Old Version');

    exec("git clone https://github.com/Mathih13/HaroldBotv2.git", (err, stdout, stderr) => {
        if (err) {
            console.log(err);
            return;
            // should have err.code here?
        }
        console.log('Cloned Latest version - installing dependencies')

        exec("cd HaroldBotv2 && npm install", (err, stdout, stderr) => {
            if (err) {
                console.log(err);
                return;
                // should have err.code here?
            }
            console.log(stdout)
            console.log('Installed! - Restarting PM2 Config');

            exec("pm2 delete HaroldBotv2", (err, stdout, stderr) => {
                if (err) {
                    console.log(err);
                    return;
                    // should have err.code here?
                }
                console.log(stdout)

                exec("pm2 start index.js --name HaroldBotv2", (err, stdout, stderr) => {
                    if (err) {
                        console.log(err);
                        return;
                        // should have err.code here?
                    }
                    console.log(stdout)
                })
            })

        })

    })
});

