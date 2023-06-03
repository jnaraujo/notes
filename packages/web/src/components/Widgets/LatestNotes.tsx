import Note from "../Note";

export default function LatestNotes() {
  return <div className="md:w-3/5">
    <h2 className="text-xl font-bold text-zinc-600 mt-6">
      Suas últimas notas:
    </h2>
    <div className="flex flex-col gap-2 mt-2">
      <Note title="Como eu criei um site que gera sites?" description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
voluptatum, quibusdam, quia, quos voluptates voluptate quod
voluptatibus quas doloribus quidem voluptatem. Quisquam voluptatum,
quibusdam, quia, quos voluptates voluptate quod voluptatibus quas
doloribus quidem voluptatem." views={900000} url="#" />
    </div>
  </div>
}