
const { writeFileSync, readFileSync, readdirSync } = require('fs')
var shields = require('shields-lightweight');

// =====================================================================

/**
 * The adguard header text
 * @type {number} ruleCount
 * @returns {string}
 */
function headerContents(ruleCount) {
/**
 * @type {string}
 */
const headerTemplate = `[Adblock Plus]
! Title: TriHydera's Big Tech and Junk Blocklist
! Description: Blocks a few Big Tech domains and some other junk.
! Source: https://github.com/TriHydera/dns-blocklist/blob/master/rules.txt 
! Expires: 7 days 
! Home: https://github.com/TriHydera/dns-blocklist 
! Contribute: https://github.com/TriHydera/dns-blocklist/issues 
! License: MIT (https://mit-license.org/)
! Last modified: ${new Date().toISOString()}
! Number of entries: ${ruleCount}
!`

return headerTemplate
}

// =====================================================================

/**
 * @type {Array<string>}
 */
const files = readdirSync("./src/lists")
var newContent = ""

/**
 * @type {number}
 */
var ruleCount = 0
/**
 * @param {string} text 
 * @returns {boolean}
 */
const isRule = (text => {
    return text.charAt(0) == "|"
})

files.forEach(file => {
    const fileContent = readFileSync("src/lists/" + file).toString()

    fileContent.split("\n").forEach(line => {
        newContent = newContent +`${line}\n`

        if(isRule(line)) {
            ruleCount = ruleCount + 1
        }
    })
})

// =====================================================================

writeFileSync("./adguard.txt", `${headerContents(ruleCount)}\n${newContent}`)
writeFileSync("./badge/rules.svg", shields.svg('Rules', `${ruleCount}`, "blue", "plastic"))

// =====================================================================

console.log(`${ruleCount} rules processed!`)