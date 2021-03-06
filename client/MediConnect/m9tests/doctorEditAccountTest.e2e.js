describe('Doctor Edit Detail flow test', () => {
	beforeEach(async () => {
		//await device.reloadReactNative();
	});

	it('should have startup screen', async () => {
		await expect(element(by.id('startup'))).toBeVisible();
		//.withTimeout(200000);
	});

	it('should show "Sign Up"', async () => {
		await expect(element(by.id('signup'))).toBeVisible();
		//.withTimeout(200000);
	});

	it('should show "Sign In"', async () => {
		await expect(element(by.id('signin'))).toBeVisible();
		//.withTimeout(200000);
	});

	it('should render "Doctor Sign In Page" on pressing sign in', async () => {
		await element(by.id('signin')).tap();
		//await element(by.id('patientToggle')).tap();
		await expect(element(by.id('email'))).toBeVisible();
		//.withTimeout(200000);
		await expect(element(by.id('password'))).toBeVisible();
		await expect(element(by.id('signin_button'))).toBeVisible();
	});

	it('should go to “the homepage” on giving right info', async () => {
		await element(by.id('email')).clearText();
		await element(by.id('password')).clearText();
		await element(by.id('email')).typeText('alexjones@gmail.com');
		await element(by.id('password')).typeText('12345678');
		await element(by.id('signin_button')).tap();
		await expect(element(by.id('homepage'))).toBeVisible();
	});

	it('should go to “the edit page”', async () => {
		await element(by.id('Settings_Tab')).tap();
		await expect(element(by.id('Edit_Accounts_Buttons'))).toBeVisible();
		await element(by.id('Edit_Accounts_Buttons')).tap();
		await expect(element(by.id('firstname'))).toBeVisible();
		await expect(element(by.id('lastname'))).toBeVisible();
		await expect(element(by.id('email'))).toBeVisible();
		await expect(element(by.id('age'))).toBeVisible();
		await expect(element(by.id('experience'))).toBeVisible();
		await expect(element(by.id('Save_Button'))).toBeVisible();
	});

	it('should save the edits', async () => {
		await element(by.id('firstname')).clearText();
		await element(by.id('lastname')).clearText();
		await element(by.id('age')).clearText();
		await element(by.id('experience')).clearText();

		await element(by.id('firstname')).typeText('Rick');
		await element(by.id('lastname')).typeText('Astley');
		await element(by.id('age')).typeText('86');
		await element(by.id('experience')).typeText('16');
		await element(by.id('Save_Button')).tap();
	});

	it('should render success message', async () => {
		await expect(
			element(by.text('Your account details were successfully updated')),
		).toBeVisible();
		await element(by.text('OK')).tap();
	});
});
