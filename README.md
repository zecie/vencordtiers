# autojoinqueue

automatically clicks "join queue" the instant it appears in discord. works in the background even if you're fullscreened in a game.

---

## installation

### step 1 — install git

if you don't have git, download it from https://git-scm.com and install it. just click through the defaults.

### step 2 — install node.js

download node.js (LTS version) from https://nodejs.org and install it. defaults are fine.

### step 3 — install pnpm

open a terminal (cmd or powershell on windows, terminal on mac) and run:

```
npm install -g pnpm
```

### step 4 — clone vencord

in your terminal, navigate to wherever you want to put the folder, then run:

```
git clone https://github.com/Vendicated/Vencord
cd Vencord
```

### step 5 — add the plugin

download `autoJoinQueue.tsx` and drop it into:

```
Vencord/src/userplugins/
```

if the `userplugins` folder doesn't exist, just create it.

### step 6 — install dependencies

inside the `Vencord` folder, run:

```
pnpm install --frozen-lockfile
```

### step 7 — build vencord

```
pnpm build
```

### step 8 — inject into discord

make sure discord is fully closed first, then run:

```
pnpm inject
```

follow the prompts. it'll ask you to point it at your discord install if needed.

### step 9 — open discord and enable the plugin

1. open discord
2. go to **user settings** (gear icon bottom left)
3. scroll down to **vencord** in the sidebar
4. click **plugins**
5. search for **autojoinqueue**
6. toggle it on

---

## updating

if you ever need to update, pull the latest vencord changes and rebuild:

```
git pull
pnpm build
```

---

## uninstalling

to remove the plugin just delete `autoJoinQueue.tsx` from `src/userplugins/` and rebuild. to fully remove vencord, run `pnpm uninject` before closing discord.
