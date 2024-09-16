export const Title= () => {
    return(
        <div className="flex justify-center border-double border-8 rounded-xl border-black">
            <h1 className="font-playfair-display text-center text-3xl font-bold">
              Transaksi
            </h1>
          </div>
    )
}

export const MessageNoTransaction = () => {
    return(
        <main className="bg-white p-4 rounded-md mt-4">
            <p className="text-center font-ubuntu font-bold">
              Belum ada transaksi. Ayo tambahkan!
            </p>
          </main>
    )
}