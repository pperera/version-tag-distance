const core = require('@actions/core');
const github = require('@actions/github');
const exec = require('@actions/exec');

async function checkVersion()
{
    try {
        let gitOutput = '';
        let gitError = '';


        const options = {
            listeners: {
                stdout: (data) => {
                    gitOutput += data.toString();
                },
                stderr: (data) => {
                    gitError += data.toString();
                }
            }
        };

        await exec.exec('git', ['describe', '--tags', '--abbrev=1'], options);
        console.log(gitOutput);
        let gitDescribeParts = gitOutput.split('-');
        let versionString=gitDescribeParts[0];
        let gitCommitDistance=parseInt(gitDescribeParts[1]);
        let revision = parseInt(searchText.match(/[0-9]+$/im)[0]);

        let newRevision = revision + gitCommitDistance
        
        let outputVersion = versionString.replace(/[v]*(.+)([0-9]+)$/gim, "$1") + newRevision.toString();
        
        core.setOutput("version", outputVersion);
        // Get the JSON webhook payload for the event that triggered the workflow
        const payload = JSON.stringify(github.context.payload, undefined, 2)
        console.log(`The event payload: ${payload}`);
    } catch (error) {
        core.setFailed(error.message);
    }
}

checkVersion();