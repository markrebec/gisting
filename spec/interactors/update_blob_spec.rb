require 'rails_helper'

RSpec.describe UpdateBlob, type: :interactor do
  describe '.call' do
    let(:blob) { create(:blob) }

    context 'without a blob' do
      subject { described_class.call }

      it 'fails' do
        expect(subject).to be_a_failure
      end
    end

    context 'with a blob' do
      subject { described_class.call(blob: blob) }

      it 'succeeds' do
        expect(subject).to be_a_success
      end
    end

    context 'with a blob_id' do
      subject { described_class.call(blob_id: blob.id) }

      it 'succeeds' do
        expect(subject).to be_a_success
      end

      it 'adds the blob to the context' do
        expect(subject.blob).to eq(blob)
      end
    end

    context 'with a filename' do
      subject { described_class.call(blob: blob, filename: 'changed.txt') }

      it 'updates the filename' do
        expect { subject }.to change { blob.reload.filename }.to('changed.txt')
      end
    end

    context 'without a filename' do
      subject { described_class.call(blob: blob) }

      it 'does not update the filename' do
        expect { subject }.to_not change { blob.reload.filename }
      end
    end

    context 'with a body' do
      subject { described_class.call(blob: blob, body: 'This is a changed body') }

      it 'updates the filename' do
        expect { subject }.to change { blob.reload.body }.to('This is a changed body')
      end
    end

    context 'without a body' do
      subject { described_class.call(blob: blob) }

      it 'does not update the body' do
        expect { subject }.to_not change { blob.reload.body }
      end
    end
  end
end
