import * as bcrypt from "bcrypt";
import { UserImpl } from "../UserImpl";

describe("UserImpl", () => {
  it("debe generar un token cuando las credenciales son válidas", async () => {
    const repo = {
      findByCorreo: jest.fn().mockResolvedValue({
        id: 1,
        correo: "user@test.com",
        password: await bcrypt.hash("123456", 10)
      })
    } as any;

    const service = new UserImpl(repo);
    const token = await service.login("user@test.com", "123456");

    expect(token).toBeDefined();
    expect(typeof token).toBe("string");
  });

  it("debe rechazar una contraseña incorrecta", async () => {
    const repo = {
      findByCorreo: jest.fn().mockResolvedValue({
        id: 1,
        correo: "user@test.com",
        password: await bcrypt.hash("123456", 10)
      })
    } as any;

    const service = new UserImpl(repo);

    await expect(service.login("user@test.com", "incorrecta"))
      .rejects.toThrow("Contraseña incorrecta");
  });
});
