import PortalComponent from '../models/PortalComponent.js';

export const getPortalComponents = async (req, res) => {
    try {
        const { type } = req.query;
        const filter = type ? { type, active: true } : { active: true };
        const components = await PortalComponent.find(filter).sort({ order: 1 });
        res.json(components);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createPortalComponent = async (req, res) => {
    try {
        const component = await PortalComponent.create(req.body);
        res.status(201).json(component);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updatePortalComponent = async (req, res) => {
    try {
        const component = await PortalComponent.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!component) return res.status(404).json({ message: 'Component not found' });
        res.json(component);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deletePortalComponent = async (req, res) => {
    try {
        const component = await PortalComponent.findByIdAndDelete(req.params.id);
        if (!component) return res.status(404).json({ message: 'Component not found' });
        res.json({ message: 'Component deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
