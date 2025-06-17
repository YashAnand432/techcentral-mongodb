const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

async function getAllUsers(request, response) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        // Exclude password from response
      }
    });
    return response.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return response.status(500).json({ error: "Error fetching users" });
  }
}

async function createUser(request, response) {
  try {
    const { email, password, role } = request.body;

    // Input validation
    if (!email || !password) {
      return response.status(400).json({ error: "Email and password are required" });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return response.status(400).json({ error: "Invalid email format" });
    }

    // Validate password length
    if (password.length < 6) {
      return response.status(400).json({ error: "Password must be at least 6 characters long" });
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return response.status(409).json({ error: "User with this email already exists" });
    }

    // Hash password with secure salt rounds
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: role || "user", // Default role if not provided
      },
    });

    // Don't return password in response
    const { password: _, ...userWithoutPassword } = user;
    return response.status(201).json(userWithoutPassword);
  } catch (error) {
    console.error("Error creating user:", error);
    
    // Handle specific Prisma errors
    if (error.code === 'P2002') {
      return response.status(409).json({ error: "User with this email already exists" });
    }
    
    return response.status(500).json({ error: "Error creating user" });
  }
}

async function updateUser(request, response) {
  try {
    const { id } = request.params;
    const { email, password, role } = request.body;

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      return response.status(404).json({ error: "User not found" });
    }

    // Validate email format if provided
    if (email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        return response.status(400).json({ error: "Invalid email format" });
      }
    }

    // Prepare update data
    const updateData = {};
    if (email) updateData.email = email;
    if (role) updateData.role = role;

    // Only hash password if it's being updated
    if (password) {
      if (password.length < 6) {
        return response.status(400).json({ error: "Password must be at least 6 characters long" });
      }
      updateData.password = await bcrypt.hash(password, 12);
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: updateData,
    });

    // Don't return password in response
    const { password: _, ...userWithoutPassword } = updatedUser;
    return response.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error("Error updating user:", error);
    
    // Handle specific Prisma errors
    if (error.code === 'P2002') {
      return response.status(409).json({ error: "Email already exists" });
    }
    
    return response.status(500).json({ error: "Error updating user" });
  }
}

async function deleteUser(request, response) {
  try {
    const { id } = request.params;

    // Check if user exists before deletion
    const existingUser = await prisma.user.findUnique({
      where: { id }
    });

    if (!existingUser) {
      return response.status(404).json({ error: "User not found" });
    }

    await prisma.user.delete({
      where: { id }
    });

    return response.status(204).send();
  } catch (error) {
    console.error("Error deleting user:", error);
    return response.status(500).json({ error: "Error deleting user" });
  }
}

async function getUser(request, response) {
  try {
    const { id } = request.params;
    
    const user = await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
        // Exclude password from response
      }
    });

    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    return response.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return response.status(500).json({ error: "Error fetching user" });
  }
}

async function getUserByEmail(request, response) {
  try {
    const { email } = request.params;
    
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        role: true,
        // Exclude password from response
      }
    });

    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    return response.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return response.status(500).json({ error: "Error fetching user" });
  }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers,
  getUserByEmail,
};
