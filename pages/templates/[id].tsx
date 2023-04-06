import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Layout from "../../components/Layout";
import {TEMPLATES} from "../../constants/templates";
import InputOutputComponent from "../../components/InputOutputComponent";
import WindowNotInstalled from '../../components/WindowNotInstalled';

const TemplatePage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [template, setTemplate] = useState(null);
    const [windowIsInstalled, setWindowIsInstalled] = useState<boolean>(false);
    const [model, setModel] = useState<string>("Loading...");

    const getModel = async () => {
        const res : string = await (window as any).ai.getCurrentModel();
        setModel(res);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if ((window as any).ai) {
              setWindowIsInstalled(true);
              getModel();
            }
          }, 1000);
        return () => clearInterval(interval);
      }, []);

    useEffect(() => {
        if (id) {
            const selectedTemplate = TEMPLATES.find((t) => t.id === id);
            // @ts-ignore
            setTemplate(selectedTemplate);
        }
    }, [id]);

    if (!template) {
        return <div>Loading...</div>;
    }

    return (
        // @ts-ignore
        <Layout title="">
            {!windowIsInstalled && <WindowNotInstalled />}
            <InputOutputComponent template={template} installed={windowIsInstalled} model={model} />
        </Layout>

    );
};

export default TemplatePage;
