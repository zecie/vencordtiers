# autojoinqueue vencord plugin

automatically joins mctiers queue in discord - no clicking needed

## what you need first

before starting, you need to install some software on your computer:

### 1. install node.js

node.js is required to build vencord

**windows:**
- go to https://nodejs.org/
- download the latest LTS version (should be 18 or higher)
- run the installer and follow the setup wizard
- keep all default settings

**mac:**
- go to https://nodejs.org/
- download the latest LTS version (should be 18 or higher)
- open the downloaded .pkg file and follow the installer
- or if you have homebrew: `brew install node`

**to check if it installed:**
- open terminal (mac) or command prompt (windows)
- type `node --version` and press enter
- you should see a version number like v20.x.x

### 2. install pnpm

pnpm is the package manager vencord uses

**after node.js is installed, open terminal/command prompt and run:**
```bash
npm install -g pnpm
```

**to check if it installed:**
```bash
pnpm --version
```

### 3. install git (if you don't have it)

git lets you download vencord

**windows:**
- download from https://git-scm.com/download/win
- run installer with default settings

**mac:**
- if you have homebrew: `brew install git`
- or download from https://git-scm.com/download/mac

## installation steps

### step 1: download vencord

open terminal (mac) or command prompt (windows) and run:

```bash
cd Desktop (or the path to the folder you wish to use to store the cloned repository)
git clone https://github.com/Vendicated/Vencord.git
cd Vencord
```

this downloads vencord to your desktop

### step 2: add the plugin

copy the `autoJoinQueue.tsx` file into the `Vencord/src/userplugins/` folder
(if theres no /userplugins folder in src make one and proceed from there)

**on windows:** the path is `C:\Users\YourName\Desktop\Vencord\src\userplugins\`

**on mac:** the path is `/Users/YourName/Desktop/Vencord/src/userplugins/`

### step 3: install vencord dependencies

in your terminal/command prompt (make sure you're in the vencord folder):

```bash
pnpm install
```

this will download all the files vencord needs (takes a few minutes)

### step 4: build vencord

```bash
pnpm build
```

this compiles vencord with your plugin included

### step 5: install vencord to discord

**important: close discord completely before running this**

```bash
pnpm inject
```

this installs vencord into your discord app

### step 6: enable the plugin

1. open discord
2. click the settings gear icon (bottom left)
3. scroll down to "vencord" section in settings
4. click "plugins"
5. search for "autojoinqueue"
6. toggle it on

## how to use

once enabled, the plugin works automatically:
- join any discord channel that has a "join queue" button
- the plugin will click it for you automatically
- it clicks 3 times to make sure it works
- your screen won't go to sleep while it's active
- when you switch channels, it resets and watches for new buttons

## removing vencord

if you want to uninstall vencord from discord:

1. close discord completely
2. open terminal/command prompt
3. go to the vencord folder:
```bash
cd Desktop/Vencord
```
4. run:
```bash
pnpm uninject
```

## troubleshooting

**"command not found" or "not recognized":**
- make sure you installed node.js and pnpm correctly
- try closing and reopening your terminal/command prompt
- on windows, you might need to restart your computer

**discord won't open after injecting:**
- run `pnpm uninject` to remove vencord
- make sure discord is completely closed before injecting
- try running command prompt/terminal as administrator (windows)

**plugin doesn't show up:**
- make sure `autoJoinQueue.tsx` is in the correct folder
- try rebuilding: `pnpm build` then `pnpm inject` again

**still having issues:**
- join the vencord discord: https://discord.gg/D9uwnFnqmd
