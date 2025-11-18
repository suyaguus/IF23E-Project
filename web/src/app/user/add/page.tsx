import Image from "next/image";
import styles from "../user.module.css";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function UserAddPage() {
  return (
    <>
      <article>
        {/* area kode */}
        <section>
          <div className="grid w-full max-w-sm items-center gap-3">
            {/* fungsi htmlfor mengarahkan label ke input walaupun terpisah */}
            <Label htmlFor="txt_kode">Username</Label>
            <Input
              type="text"
              id="txt_kode"
              placeholder="Isi Username"
              maxLength={15}
            />
          </div>
        </section>

        {/* area nama */}
        <section>
          <div className="grid w-full max-w-sm items-center gap-3">
            {/* fungsi htmlfor mengarahkan label ke input walaupun terpisah */}
            <Label htmlFor="txt_nama">Email</Label>
            <Input
              type="text"
              id="txt_nama"
              placeholder="Contoh: user@gmail.com"
              maxLength={50}
            />
          </div>
        </section>
      </article>
    </>
  );
}
