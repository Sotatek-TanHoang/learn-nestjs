import { exec } from 'child_process';

exec(
  `typeorm migration:create ${process.cwd()}/apps/migration/src/database/${process.argv[2]}`,
  (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`${stdout}`);
  },
);
