import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  let { data: cabins, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error);
    throw new Error("Error while fetching the data");
  }
  return cabins;
}

export async function deleteCabin(id) {
  const { error, data } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin couldn't be deleted");
  }
  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
  const imageName = `${Math.random()}-${newCabin.image?.name || ""}`
    .replaceAll(" ", "")
    .replaceAll("/", "");
  const imagePath = hasImagePath
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  let query = supabase.from("cabins");

  // Handle cabin creation or update
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]).select();
  } else {
    query = query
      .update({ ...newCabin, image: imagePath })
      .eq("id", id)
      .select();
  }

  const { data, error } = await query;

  if (error) {
    console.error(error);
    throw new Error("Unable to add or update the cabin");
  }

  if (hasImagePath) return data;

  // Upload image if cabin created/updated successfully and new image is provided
  if (newCabin.image && !hasImagePath) {
    const { error: storageError } = await supabase.storage
      .from("cabin-images")
      .upload(imageName, newCabin.image);

    if (storageError) {
      if (!id) {
        // If it was a new cabin creation, delete the created cabin entry
        await supabase.from("cabins").delete().eq("id", data[0].id);
      }
      console.error(storageError);
      throw new Error(
        "Cabin image could not be uploaded and the cabin was not created"
      );
    }
  }

  return data;
}
