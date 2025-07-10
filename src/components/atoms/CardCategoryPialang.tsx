interface CardCategoryPialangProps {
  title?: string;
  slug: string;  // slug ditambahkan
}

export default function CardCategoryPialang({ title, slug }: CardCategoryPialangProps) {
  return (
    <a
      href={`/profil/wakil-pialang/${slug}`}  // slug dipakai di sini
      className="border-2 border-green-500 p-10 text-2xl text-center uppercase rounded-lg bg-zinc-200 text-green-500 hover:border-green-600 hover:bg-zinc-300 hover:text-green-600 transition-all ease-in duration-300"
    >
      {title}
    </a>
  );
}
