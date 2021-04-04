---
title: Use a new file for each new card
shortDescription: Imdone puts every new card in it's own file.
description: |
  This configuration uses the **New File** journal type.  Every card created in imdone will be put in a new file.
  It's perfect for working with static site generators like [VuePress](https://vuepress.vuejs.org/), [docsify](https://docsify.js.org/#/)
  and [GatsbyJS](https://www.gatsbyjs.org/).  For a more complete list of static site generators visit [StaticGen | Top Open Source Static Site Generators](https://www.staticgen.com/).  
---

## [Get started with imdone](#DONE:0.01953125)
### Click on the green `getting-started` tag to filter your board for cards with the `getting-started` tag.
1. Start here, then work through the cards in TODO
2. Drag this card to DOING
3. Open to this card in context by hovering over it and clicking the :link: at the top of this card.  Notice the list name has changed to DOING.
4. Now drag this card to DONE and click the file link again.
<!-- +getting-started due:2021-04-03T07:29:24.000Z completed:2021-04-03T09:21:27.022Z -->

## [Imdone supports task lists in markdown files.](#DONE:2.5)
1. Drag this card to DOING.
2. Click the box below.
    - [ ] check me
    - Click the file link again, and notice the x in the box
3. Click the expand icon below to see what's next. :point_down:
4. Drag this card to DONE and drag the next card in TODO to DOING.
    - I think you get the idea. :)
<!-- +getting-started due:2021-04-03T07:29:24.000Z completed:2021-04-03T09:21:20.438Z -->

## [Configure your editor](#DONE:1.25)
- [ ] Hover over the <i class="fas fa-ellipsis-v"></i> in the upper left corner and click _Board Settings_
- [ ] Select your favorite editor or enter a command that will open it
- [ ] Learn more about opening editors [here](https://imdone.io/docs/#/editors)
<!-- +getting-started due:2021-04-03T07:29:24.000Z completed:2021-04-03T09:21:21.487Z -->

## [Use imdone as a daily journal.](#DONE:0.625)
- [ ] Hover over the &nbsp; <i class="fas fa-ellipsis-v"></i> &nbsp; in the nav bar
- [ ] Click on the "**Markdown Journal**" item or press **cmd or ctrl + shift + j** at any time to open it.
- [ ] You can find more keyboard shortcuts [here](https://imdone.io/docs/#/settings?id=keyboard-shortcuts).
<!-- +getting-started due:2021-04-03T07:34:24.000Z completed:2021-04-03T09:21:22.507Z -->

## [Add and Edit Cards](#DONE:0.3125)
- [ ] Quickly add a card by clicking "+ **Add a card**" at the bottom of this list.
  - Since this project is using the "New File" journal type, all cards created in imdone will be added to a new file with the first line of the card as the name.
- [ ] Quickly edit this card by hovering over it and clicking the pencil.
<!-- +getting-started due:2021-04-03T07:34:24.000Z completed:2021-04-03T09:21:23.420Z -->

## [Read the documentation](#DONE:0.15625)
- [imdone.io/docs](https://imdone.io/docs).
- [ ] Clear the filter field to see all the TODO comments in your code.  If you have any. :)
- You can get to the documentation at any time using the help menu
<!-- +getting-started due:2021-04-04T11:00:00.000Z completed:2021-04-03T09:21:24.309Z -->

## [If you have any questions, feel free to reach out!](#DONE:0.078125)
- [Jesse on drift](https://drift.me/jesse36)
<!-- +getting-started due:2021-04-10T11:00:00.000Z completed:2021-04-03T09:21:25.236Z -->

<!-- 
## [Put your TODOs in block comments to keep them out of generated content.](#DONE:0.0390625)
[//]: # (+getting-started due:2021-04-10T11:00:00.000Z completed:2021-04-03T09:21:26.121Z)
-->

## [Keyboard shortcuts](#NOTE:10)
<!-- +getting-started expand:1 -->
| Action                       | Shortcut                                           |
|------------------------------|----------------------------------------------------|
| Navigate Selected Card       | :arrow_up: :arrow_down: :arrow_left: :arrow_right: |
| Move Selected Card Up        | shift+:arrow_up:                                   |
| Move Selected Card Down      | shift+:arrow_down:                                 |
| Move Selected Card Left      | shift+:arrow_left:                                 |
| Move Selected Card Right     | shift+:arrow_right:                                |
| Move Selected Card To Top    | cmd+:arrow_up: or ctrl+:arrow_up:                  |
| Move Selected Card To Bottom | cmd+:arrow_down: or ctrl+:arrow_down:              |
| Edit Selected Card           | return or enter                                    |
| Open file of Selected Card   | cmd+o or ctrl+o                                    |
| Delete Selected Card         | delete or backspace                                |
| Add a Card                   | space                                              |
| Save Card Edits              | cmd+s or ctrl+s                                    |
| Filter                       | cmd+f or ctrl+f                                    |
| Clear Filter                 | esc                                                |
| Open Journal                 | cmd+shift+j or ctrl+shift+j (Global)               |
| Cycle through tabs           | ctrl+tab                                           |
| Add a board                  | cmd+n or ctrl+n                                    |
| Board Settings               | cmd+/ or ctrl+/                                    |
| Default Settings             | opt+/ or alt+/                                     |
| Save Settings                | cmd+s or ctrl+s                                    |
| Zoom in                      | cmd+shift+[+]                                      |
| Zoom out                     | cmd+[-]                                            |
| Zoom reset                   | cmd+0                                              |


## [Activity](#NOTE:0)
<!-- 
expand:1 refresh:5000
-->
| Status                 | #                                           | <span style="font-size: 1.5em;">:chart:</span> |
|------------------------|---------------------------------------------|------------------------------------------------|
| **What's Due?**        | <!--[{{totals["What's Due?"]}}]-->          | <!--[ {{dueEmoji}} ]-->                        |
| **Recently Completed** | <!--[ {{totals["Recently Completed"]}} ]--> | <!--[ {{recentEmoji}} ]-->                     |
| **WIP**                | <!--[ {{totals["DOING"]}} ]-->              | <!--[ {{wipEmoji}} ]-->                        |