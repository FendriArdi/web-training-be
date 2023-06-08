const db = require(".");
const { hashPassword } = require("../helpers/bcrypt");

const accounts = [
  {
    username: "hrdmwt",
    password: "mwthrd01",
    departement: "HRD",
    role: "admin",
  },
  {
    username: "mktmwt",
    password: "mwtmkt02",
    departement: "Marketing",
  },
  {
    username: "pchmwt",
    password: "mwtpch03",
    departement: "Purchasing",
  },
  {
    username: "qmsmwt",
    password: "mwtqms04",
    departement: "QMS",
  },
  {
    username: "prdmwt",
    password: "mwtprd05",
    departement: "Produksi",
  },
  {
    username: "ppicmwt",
    password: "mwtppic06",
    departement: "PPIC",
  },
  {
    username: "qcmwt",
    password: "mwtqc07",
    departement: "Quality Control",
  },
  {
    username: "engmwt",
    password: "mwteng08",
    departement: "Engineering",
  },
  {
    username: "gamwt",
    password: "mwtga09",
    departement: "General Affair",
  },
  {
    username: "rmmwt",
    password: "mwtrm10",
    departement: "Repair & Maintanance",
  },
];

const hashedAccounts = accounts.map((account) => {
  return {
    ...account,
    password: hashPassword(account.password),
  };
});

async function main() {
  try {
    const results = await db.user.createMany({
      data: hashedAccounts,
    });

    console.log(results);
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await db.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await db.$disconnect();
    process.exit(1);
  });
