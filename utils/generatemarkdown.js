module.exports = (READMEdata) => {
    const {
      name,
      description,
      github,
      email,
      sections,
      sectionContent,
      license,
    } = READMEdata;
    return `
  # ${name}
  ${renderLicenseBadge(license)}
  **${description}**
  ## Table of Contents
  ${sections
    .map((section) => {
      return `
  [${section}](#${section.toLowerCase().split(" ").join("-")})\n`;
    })
    .join("")}
  [Questions](#questions)
  [License](#license)
  ${Object.entries(sectionContent[0])
    .map(([key, value]) => {
      return `
  ## ${key}\n
  ${value}`;
    })
    .join("")}
  ## Questions
  For information about the developer, see my [GitHub Profile](https://github.com/${github})
  For general questions, please email me: ${email}
  ## License
  Copyright (c)  ${new Date().getFullYear()} by [${github}](https://github.com/${github})
  ${renderLicenseSection(license)}
  `;
  };
  function renderLicenseBadge(license) {
    if (license === "No-License") {
      return ``;
    } else if (license === "MIT") {
      return `[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)`;
    } else {
      return `[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)`;
    }
  }
  function renderLicenseSection(license) {
    if (license === "No-License") {
      return ``;
    } else if (license === "MIT") {
      return `
  MIT License
  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:
  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.
  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
  For more information visit https://opensource.org/licenses/MIT`;
    } else {
      return `
  GNU GENERAL PUBLIC LICENSE
  Version 3, 29 June 2007
  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.
          
  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.
          
  You should have received a copy of the GNU General Public License
  along with this program.  If not, see https://www.gnu.org/licenses/`;
 }