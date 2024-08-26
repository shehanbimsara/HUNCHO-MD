const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNlBkdXBlTDF4RVkyaFhqOWVsMTRRZndKYUxEbzVsa2krcUxRVDBxUGpuWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVmlORDJDS2xmSUhWaktDQ3pQekJNTWloU2xEUHFOMm1RV054V05vdXN4cz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIwQm0wRDBiajQ4UGtOY3RHUUozUUlINGhqMnhEcitPQ2M3MEh6RkI3bUZrPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJReTRpaDlHeUNPanFNS0JJekRYNUhHVGxUL3loYXFINVczRlNmTVNDTUdZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjhGelh4ZW02eWI4UlJUcDFHaEFmUHpVaWRnZzJTZ2hReEw3RTB0OHliRkk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9CaUt5Vzg3Y25Va05XcU53WkpzK3BvV0g4RHJ3N2VjbERkdFpLbGhEeVU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZ0h1bHVXWThITm1LSm1KTFlRV3dtbkxib3FJMVRYbVZHdjl6R1ZwTFRXRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOHZUMjhFMUxlYUt0VWdYazZkMFVpeEIrSVVhTWxSc3JsSS9yRno1MHh5TT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJFN0FSYnVHTGFzY05RSy9XOTEweWV3L3RJRHVjTkJZREQ2Q1h0K0dpL0ZyeGVVQnovOGZ1TGpiU2VoNjB6TzJIUFZ5anNvVk9KK1ZjOEJEdm5TVUNRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjEzLCJhZHZTZWNyZXRLZXkiOiJoeUdRd3FRQWsyYmhiY2RhQmlnamF2dkc1WFhsWW1MaUNHVTNxNytnT3FvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6Ijk0NzEzNDE2NDgyQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjA0MENGQjQ1RDNDMzIxNUU1ODk4ODcwM0VDRDJFNTZFIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjQ0NjczMTV9LHsia2V5Ijp7InJlbW90ZUppZCI6Ijk0NzEzNDE2NDgyQHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkRBOEUxRjExRDQ0MkMzMTFGNkEwQkREQjU3N0U2QjBFIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3MjQ0NjczMTV9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IjlHMGU2TGREUS1pS0I5d2szTmNIbUEiLCJwaG9uZUlkIjoiMjBkMDY2M2YtYzhjOS00NTA0LTkxNTktNjAxNWU1YmU2Y2Y4IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1nbUsvWGUxWS9jYmlMbzl1VTVyTk43cmFBQT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJGMTlvRTYrV1JjSVRKdFV2dDZrZTVjRUliekU9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiVEVIOUtMUUQiLCJtZSI6eyJpZCI6Ijk0NzEzNDE2NDgyOjhAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0lQaXA5SUNFT0dRcGJZR0dBRWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InloaTZlWFFmY0R2NTZNTkZIaEFaR3ZIMWRmTkp6K05TNXF1eStzdExPbG89IiwiYWNjb3VudFNpZ25hdHVyZSI6InlmcXNrVzd6OGI3V3dHV2t3YXUyRzI0WnI0bDAvTy9nakJTUEgzNnlKaVhqdlozQ0VlZW9yRHhZSURaajNUdWsxazhoOHhVV29QTU1QUElGelloYkJnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJXQ0lBUlVYSWxiU1JqZlhpWDdsd01vNHlkd05LOUpOT0cxSVVtT1dPQ2JzZGl0THB4b25KZ3ZjRUVBWmJ2Vk5vY2tSekM2elBqMzRNWE9wQ202TFRDZz09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6Ijk0NzEzNDE2NDgyOjhAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCY29ZdW5sMEgzQTcrZWpEUlI0UUdScng5WFh6U2MvalV1YXJzdnJMU3pwYSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNDQ2NzMxMH0=',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "+94713416482",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'HUNCHO MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e18441d126f37be8efbfa.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
