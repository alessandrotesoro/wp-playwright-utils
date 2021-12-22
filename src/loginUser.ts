import { chromium } from '@playwright/test';

/**
 * Performs log in with specified username and password.
 *
 * @param {string} username String to be used as user credential.
 * @param {string} password String to be used as user credential.
 */
const loginUser = async ( username: string, password: string ) => {
	const browser = await chromium.launch();
	const page = await browser.newPage();

	await page.goto( 'http://localhost:8889/wp-login.php' );
	await page.waitForSelector( '#user_login' );
	await page.click( '#user_login' );
	await page.type( '#user_login', 'admin' );
	await page.type( '#user_pass', 'password' );

	await page.click( '#wp-submit' );
	await page.waitForNavigation();

	// Save signed-in state to 'storageState.json'.
	await page.context().storageState({ path: 'storageState.json' });
	await browser.close();
}

export default loginUser
