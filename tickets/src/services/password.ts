import { scrypt, randomBytes } from 'crypto'
import { promisify } from 'util'

// `scrypt` is a callback-based function, so we use `promisify` to turn it into a Promise-based function
const scryptAsync = promisify(scrypt)

export class Password {
  // This method will hash the given password and return it along with a salt
  static async toSaltedHash(password: string) {
    // Generate a random string (salt) to make the password hash more secure
    const randomSalt = randomBytes(8).toString('hex')

    // Hash the password along with the salt using scrypt
    // The result is a Buffer object containing the hashed password
    const hashedPassword = (await scryptAsync(
      password,
      randomSalt,
      64,
    )) as Buffer

    // Return the hashed password as a hex string along with the salt, separated by a dot
    // This format is important because we'll need both the hash and the salt to verify the password later
    return `${hashedPassword.toString('hex')}.${randomSalt}`
  }

  // This method will compare a stored hashed password with a newly supplied password
  static async compare(
    storedSaltedHashPassword: string,
    suppliedPassword: string,
  ) {
    // Logic to split the stored password and verify the supplied password will go here
    const [storedHashedPassword, randomSalt] =
      storedSaltedHashPassword.split('.')
    const suppliedHashedPassword = (await scryptAsync(
      suppliedPassword,
      randomSalt,
      64,
    )) as Buffer
    return suppliedHashedPassword.toString('hex') === storedHashedPassword
  }
}
