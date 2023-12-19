const currentVersion = process.argv.indexOf('--currentVersion');
let currentVersionValue;

const versionToken = process.argv.indexOf('--tokenVersion');
let versionTokenValue;

if (currentVersion > -1) {
    currentVersionValue = process.argv[currentVersion + 1];
    if (`${currentVersionValue}` === 'undefined') {
        throw new Error("--currentVersion argument value is missing")
    }
}
else {
    throw new Error("--currentVersion argument is missing")
}

if (versionToken > -1) {
    versionTokenValue = process.argv[versionToken + 1];
    if (`${versionTokenValue}` === 'undefined') {
        throw new Error("--tokenVersion argument value is missing")
    }
} else {
    throw new Error("--tokenVersion argument is missing")
}

splittedVersion = currentVersionValue.split('.')

for (let versionPartNumber = 0; versionPartNumber < splittedVersion.length; versionPartNumber++) {
    splittedVersion[versionPartNumber] = Number(splittedVersion[versionPartNumber])
}

splittedVersion.reverse()

splittedVersion[0] += 1

for (let versionPart = 0; versionPart < splittedVersion.length - 1; versionPart++) {
    if (splittedVersion[versionPart] == 10) {
        splittedVersion[versionPart] = 0
        splittedVersion[versionPart + 1] += 1
    }
}

splittedVersion.reverse()


for (let versionPartNumber = 0; versionPartNumber < splittedVersion.length; versionPartNumber++) {
    splittedVersion[versionPartNumber] = String(splittedVersion[versionPartNumber])
}

const newVersion = splittedVersion.join('.')

const body = JSON.stringify({
    name: "FRONT_VERSION",
    value: newVersion,
    created_at: "2023-12-18T13:39:53Z",
    updated_at: Date.now(),
    visibility: "all"
})


var myHeaders = new Headers();
myHeaders.append("Content-Type", "text/plain");
myHeaders.append("Authorization", "Bearer " + versionTokenValue);

var requestOptions = {
  method: 'PATCH',
  headers: myHeaders,
  body: body,
  redirect: 'follow'
};

fetch("https://api.github.com/orgs/O-bing/actions/variables/FRONT_VERSION", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));