import { test, expect } from '@playwright/test';

test('TC01 Login สำเร็จ', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByLabel('หมายเลขโทรศัพท์มือถือ').fill('0800000000');
  await page.getByPlaceholder('อย่างน้อย 8 ตัวอักษร').fill('uCrwVaBW39o_0G0Q5QwAVrqr');
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await expect(page.getByText('ยินดีต้อนรับ')).toBeVisible();
});

test('TC02 Login ใส่เบอร์โทรผิด', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByLabel('หมายเลขโทรศัพท์มือถือ').fill('0999999999');
  await page.getByPlaceholder('อย่างน้อย 8 ตัวอักษร').fill('uCrwVaBW39o_0G0Q5QwAVrqr');
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await expect(page.getByText('http://localhost:5173/')).not.toBeVisible();
});

test('TC03 Login ใส่ pws ผิด', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByLabel('หมายเลขโทรศัพท์มือถือ').fill('0800000000');
  await page.getByPlaceholder('อย่างน้อย 8 ตัวอักษร').fill('wrongpassword');
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await expect(page.getByText('http://localhost:5173/')).not.toBeVisible();
});

test('TC04 Login ไม่กรอกหมายเลขโทรศัพท์', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByPlaceholder('อย่างน้อย 8 ตัวอักษร').fill('uCrwVaBW39o_0G0Q5QwAVrqr');
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await expect(page).toHaveURL('http://localhost:5173/');
});

test('TC05 Login ไม่กรอกรหัสผ่าน', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByLabel('หมายเลขโทรศัพท์มือถือ').fill('0800000000');
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await expect(page).toHaveURL('http://localhost:5173/');
});

test('TC06 Login ไม่กรอกข้อมูลทั้งสองช่อง', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();
  await expect(page).toHaveURL('http://localhost:5173/');
});