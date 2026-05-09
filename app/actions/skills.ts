"use server";

import { prisma } from "@/lib/prisma";
import { getCurrentUser } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface SkillFormData {
  name: string;
  description: string;
  content: string;
  isPublic: boolean;
}

interface ActionResult {
  success: boolean;
  error?: string;
  skillId?: number;
}

/** Form state for `useActionState` on the public create-skill page */
export type CreateSkillFormState = {
  message: string;
};

/**
 * Server action compatible with React `useActionState(previousState, formData)`.
 * Resolves the author from the session cookie and delegates to {@link createSkill}.
 */
export async function createSkillFromForm(
  _prevState: CreateSkillFormState,
  formData: FormData
): Promise<CreateSkillFormState> {
  const user = await getCurrentUser();
  if (!user) {
    return { message: "You must be signed in to create a skill." };
  }

  const name = String(formData.get("name") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const content = String(formData.get("content") ?? "").trim();
  const isPublic =
    formData.get("isPublic") === "on" || formData.get("isPublic") === "true";

  if (!name || !description || !content) {
    return { message: "All fields are required." };
  }

  const result = await createSkill(
    { name, description, content, isPublic },
    user.userId
  );

  if (result.success && result.skillId != null) {
    redirect("/dashboard");
  }

  return { message: result.error ?? "Failed to create skill." };
}

export async function createSkill(
  data: SkillFormData,
  userId: number
): Promise<ActionResult> {
  try {
    const skill = await prisma.skill.create({
      data: {
        name: data.name,
        description: data.description,
        content: data.content,
        isPublic: data.isPublic,
        authorId: userId,
      },
    });

    revalidatePath("/skills");
    revalidatePath("/dashboard");

    return { success: true, skillId: skill.id };
  } catch (error) {
    console.error("Create skill error:", error);
    return { success: false, error: "Failed to create skill" };
  }
}

export async function updateSkill(
  id: number,
  data: SkillFormData,
  userId: number
): Promise<ActionResult> {
  try {
    // Verify ownership
    const existing = await prisma.skill.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (!existing || existing.authorId !== userId) {
      return { success: false, error: "Not authorized to edit this skill" };
    }

    await prisma.skill.update({
      where: { id },
      data: {
        name: data.name,
        description: data.description,
        content: data.content,
        isPublic: data.isPublic,
      },
    });

    revalidatePath("/skills");
    revalidatePath(`/skills/${id}`);
    revalidatePath("/dashboard");

    return { success: true, skillId: id };
  } catch (error) {
    console.error("Update skill error:", error);
    return { success: false, error: "Failed to update skill" };
  }
}

export async function deleteSkill(
  id: number,
  userId: number
): Promise<ActionResult> {
  try {
    // Verify ownership
    const existing = await prisma.skill.findUnique({
      where: { id },
      select: { authorId: true },
    });

    if (!existing || existing.authorId !== userId) {
      return { success: false, error: "Not authorized to delete this skill" };
    }

    await prisma.skill.delete({
      where: { id },
    });

    revalidatePath("/skills");
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Delete skill error:", error);
    return { success: false, error: "Failed to delete skill" };
  }
}