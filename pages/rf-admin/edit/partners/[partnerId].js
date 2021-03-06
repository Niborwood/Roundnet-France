import { useRouter } from "next/router";
import { getDocuments } from "../../../../helpers/db";
import useSWR from "swr";
import fetcher from "../../../../lib/swr-fetcher";

// COMPONENT IMPORTS
import AdminContentSingle from "../../../../components/admin/admin-content/admin-content-single";

// CONTENTS
import partnerConfig from "../../../../contents/admin/configs/partner";

export default function EditSinglePartnerPage() {
  // Get endpoint and ID from URL
  const router = useRouter();
  const { partnerId } = router.query;

  // Get club data
  const { data, error, mutate } = useSWR(`/api/partners/${partnerId}`, fetcher);
  const isLoading = !error && !data;

  return (
    <AdminContentSingle
      config={partnerConfig}
      data={data}
      mutate={mutate}
      documentId={partnerId}
      isLoading={isLoading}
    />
  );
}

EditSinglePartnerPage.auth = {
  role: "superadmin",
};

// NextJS functions
export async function getStaticPaths() {
  const data = await getDocuments("partners");
  const paths = data.map((user) => ({
    params: {
      partnerId: user._id,
    },
  }));
  return { paths, fallback: "blocking" };
}

export function getStaticProps() {
  return {
    props: {
      adminLayout: true,
    },
  };
}
